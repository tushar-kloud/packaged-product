# Use an official Jupyter base image
FROM jupyter/base-notebook:latest

RUN pip install jupyterlab
WORKDIR /home/jovyan/work

COPY jupyter_server_config.py $HOME/.jupyter/jupyter_server_config.py

EXPOSE 8888

CMD ["jupyter", "lab", "--no-browser", "--allow-root"]