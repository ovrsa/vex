FROM python:3.9
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app
ENV FLASK_ENV=production
CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]