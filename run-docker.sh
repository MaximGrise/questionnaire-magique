sudo docker stop questionnaire-magique
sudo docker rm questionnaire-magique
sudo docker build --tag questionnaire-magique .
sudo docker run -p 8075:80 -d --name questionnaire-magique --restart=always questionnaire-magique
