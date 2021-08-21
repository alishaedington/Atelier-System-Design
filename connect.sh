case $1 in

postgres)
    scp -i SDC.pem ./init.sh ec2-user@ec2-52-15-183-253.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-52-15-183-253.us-east-2.compute.amazonaws.com
    ;;

node)
    scp -i SDC.pem ./init.sh ec2-user@ec2-3-144-8-8.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-3-144-8-8.us-east-2.compute.amazonaws.com
    ;;

node2)
    scp -i SDC.pem ./init.sh ec2-user@ec2-18-222-176-86.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-18-222-176-86.us-east-2.compute.amazonaws.com
    ;;

nginx)
    scp -i SDC.pem ./init.sh ec2-user@ec2-18-188-42-169.us-east-2.compute.amazonaws.com:~/init.sh
    ssh -i SDC.pem ec2-user@ec2-18-188-42-169.us-east-2.compute.amazonaws.com
    ;;
esac
