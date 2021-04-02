FROM python:3

RUN apt update
RUN apt upgrade -y

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN touch zoetrope.log

CMD ["python", "site_start.py"]
