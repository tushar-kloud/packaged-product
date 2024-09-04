import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import MessageBubble from "./MessageBubble";
import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";
import Papa from "papaparse";
// import { LlamaParseReader} from 'llamaindex'

const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const AZURE_AI_API_KEY = import.meta.env.VITE_AZURE_AI_API_KEY
const LLAMA_API_KEY = import.meta.env.VITE_LLAMA_API_KEY
const account = import.meta.env.VITE_AZURE_BLOB_ACCOUNT;
const sasToken = import.meta.env.VITE_BLOB_SAS_TOKEN;
const containerName = "business-labs";

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net/?${sasToken}`
);

function PromptChat() {
  const [openDialog, setOpenDialog] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversationContext, setConversationContext] = useState([]);
  const [filesList, setFilesList] = useState([]);

  const handleSendMessage = async () => {
    if (messageInput.trim() || selectedFile) {
      let newMessages = [...messages];

      // Move the selected file to the message board
      if (selectedFile) {
        const userFileMessage = {
          text: selectedFile, // Just use the file name
          sender: "user",
          isFile: true,
          fileName: selectedFile,
        };
        newMessages = [...newMessages, userFileMessage];
        setSelectedFile(null); // Clear the selected file from input
      }

      const userMessage = {
        text: messageInput,
        sender: "user",
        loading: false,
      };
      newMessages = [...newMessages, userMessage];
      setMessages(newMessages);
      setMessageInput("");

      // Add the initial admin message if it's the first request
      let initialMessageAdded = false;
      let newContext = [
        ...conversationContext,
        { role: "user", content: messageInput },
      ];

      if (conversationContext.length === 0) {
        newContext = [
          {
            role: "system",
            content:
              "You are a helpful assistant who has to provide concise and accurate results after evaluating, only provide steps when asked.",
          },
          ...newContext,
        ];
        initialMessageAdded = true;
      }

      if (selectedFile) {
        const fileContent = await downloadBlobContent(selectedFile);

        const header = {
          'accept':'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${LLAMA_API_KEY}`
        }

        const formData = new FormData();
        formData.append('parse_file', fileContent)
        const job = await axios.post(
          'https://api.cloud.llamaindex.ai/api/parsing/upload',
          formData,
          header
        )
        console.log(job);

        // const jobStatus = await axios.get

        // const document = new Document({text:fileContent})
        // const index = await VectorStoreIndex.fromDocuments[(document)]
        // console.log(index)
        // const reader = new 
        const summarizedData = fileContent.slice(0, 300); // Example: take only the first 100 characters
        const csvText = JSON.stringify(summarizedData, null, 2);

        newContext = [
          ...newContext,
          { role: "user", content: `Attached file: ${selectedFile}` },
          { role: "system", content: csvText },
        ];
      }

      setConversationContext(newContext);

      // Placeholder for the loading state of the AI's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "", sender: "received", loading: true },
      ]);

      try {
        // console.log("Sending data:", {
        //   model: "mistral-large-latest",
        //   messages: newContext,
        // });

        const response = await axios.post(
          "https://api.mistral.ai/v1/chat/completions",
          // "https://Phi-3-mini-128k-instruct-hkubw.swedencentral.models.ai.azure.com/v1/chat/completions",
          // "https://Phi-3-mini-128k-instruct-hkubw.swedencentral.models.ai.azure.com/v1/chat/completions",
          {
            model: "mistral-large-latest",
            messages: newContext,
            // max_tokens: 250
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${MISTRAL_API_KEY}`,
              // 'apikey':`${import.meta.env.VITE_PHI3_API_KEY}`
              // 'Authorization': `Bearer ${import.meta.env.VITE_PHI3_API_KEY}`

            },
          }
        );

        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0]
        ) {
          const responseMessage = response.data.choices[0].message.content;

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              text: responseMessage,
              sender: "received",
              loading: false,
            };
            return updatedMessages;
          });

          setConversationContext([
            ...newContext,
            { role: "system", content: responseMessage },
          ]);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        console.error(
          "Error sending message to Mistral API:",
          error.response || error
        );
        const errorMessage = {
          text: "Something went wrong. Please try again.",
          sender: "received",
          loading: false,
          error: true,
        };

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = errorMessage;
          return updatedMessages;
        });
      }
    }
  };

  const fetchFilesFromBlobStorage = async () => {
    try {
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      let fileNames = [];
      for await (const blob of containerClient.listBlobsFlat()) {
        fileNames.push(blob.name);
      }
      setFilesList(fileNames);
    } catch (error) {
      console.error("Error fetching files from Azure Blob Storage:", error);
    }
  };

  const downloadBlobContent = async (blobName) => {
    try {
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(blobName);
      const downloadResponse = await blobClient.download(0);
      const blobContent = await downloadResponse.blobBody;
      const text = await blobContent.text();

      return new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          complete: function (results) {
            resolve(results.data);
          },
          error: function (error) {
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error("Error downloading blob content:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachClick = () => {
    setOpenDialog(true);
  };

  const handleFileSelect = (fileName) => {
    setSelectedFile(fileName);
    setOpenDialog(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    if (openDialog) {
      fetchFilesFromBlobStorage();
    }
  }, [openDialog]);

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        maxWidth: "1000px",
        width: "100%",
        border:'1px solid black',
        margin: "0 auto",
        boxSizing: "border-box",
        "@media (max-width: 600px)": {
          height: "100vh",
          maxWidth: "100%",
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          "@media (max-width: 600px)": {
            p: 1,
          },
        }}
      >
        {messages.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: "center",
              mt: 4,
              "@media (max-width: 600px)": { mt: 2 },
            }}
          >
            Start a conversation by typing a message or attaching a file.
          </Typography>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid #ddd",
          "@media (max-width: 600px)": {
            p: 1,
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <IconButton
            onClick={handleAttachClick}
            component="label"
            sx={{
              marginRight: "15px",
              "@media (max-width: 600px)": { marginRight: "5px" },
            }}
          >
            <AttachFileIcon />
          </IconButton>

          {selectedFile && (
            <Chip
              label={selectedFile}
              onDelete={handleRemoveFile}
              color="primary"
              avatar={<DescriptionIcon />}
              sx={{ marginRight: "15px", maxWidth: "200px" }}
            />
          )}

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
              <strong>Select a File</strong>
            </DialogTitle>
            <DialogContent>
              <List>
                {filesList.map((file, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleFileSelect(file)}
                  >
                    <Grid container alignItems="center">
                      <Grid item sx={{ marginRight: 1 }}>
                        <Avatar>
                          <DescriptionIcon />
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <ListItemText primary={file} />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>

          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type a message..."
            value={messageInput}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessageInput(e.target.value)}
            sx={{
              flexGrow: 1,
              "@media (max-width: 600px)": {
                mb: 1,
              },
            }}
          />

          <IconButton
            onClick={handleSendMessage}
            sx={{
              marginLeft: "15px",
              "@media (max-width: 600px)": { marginLeft: "0px" },
            }}
          >
            <SendIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

export default PromptChat;
