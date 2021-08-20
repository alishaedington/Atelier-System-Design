sudo yum update -yum
sudo yum install git -y
sudo yum install docker -y

git clone https://github.com/alex-richard-alisha/sdc-ratings-and-reviews.git

sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose version

sudo service docker start
sudo usermod -a -G docker ec2-user
