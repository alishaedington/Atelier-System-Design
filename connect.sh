case $1 in

postgres)
    scp -i SDC.pem ./init.sh ec2-user@ec2-18-189-29-23.us-east-2.compute.amazonaws.com	:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-18-189-29-23.us-east-2.compute.amazonaws.com
    ;;

node)
    scp -i SDC.pem ./init.sh ec2-user@ec2-18-119-117-71.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-18-119-117-71.us-east-2.compute.amazonaws.com
    ;;

node2)
    scp -i SDC.pem ./init.sh ec2-user@ec2-3-129-62-202.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-3-129-62-202.us-east-2.compute.amazonaws.com
    ;;

node3)
    scp -i SDC.pem ./init.sh ec2-user@ec2-52-15-122-106.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-52-15-122-106.us-east-2.compute.amazonaws.com
    ;;

node4)
    scp -i SDC.pem ./init.sh ec2-user@ec2-3-129-62-202.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-3-129-62-202.us-east-2.compute.amazonaws.com
    ;;

nginx)
    scp -i SDC.pem ./init.sh ec2-user@ec2-18-216-29-73.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-18-216-29-73.us-east-2.compute.amazonaws.com
    ;;
esac
