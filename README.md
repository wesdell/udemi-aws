# Udemi App

This is a learning management application developed using NextJS, Clerk, Stripe, TypeScript, and some AWS services like **S3**, **DynamoDB**, **IAM**, **Billing and Cost Management**, **ECR**, **Lambda**, **API Gateway**, and **CloudFront**.

## Documentation

- [How to run this project](#how-to-run-this-project)
  - [Clerk configuration](#clerk-configuration)
- [Set up AWS](#set-up-aws)
  - [Billing and Cost Management](#billing-and-cost-management)
  - [Identity and Access Management (IAM)](#identity-and-access-management-iam)
  - [Access AWS via Command Line Interface (CLI)](#access-aws-via-command-line-interface-cli)
  - [Elastic Container Registry (ECR)](#elastic-container-registry-ecr)
  - [Lambda](#lambda)
  - [DynamoDB](#dynamodb)
  - [API Gateway](#api-gateway)
    - [Frontend Deployment](#frontend-deployment)
  - [S3](#s3)
  - [CloudFront](#cloudfront)
    - [Lambda ENV](#edit-lambda-environment-variables)

## How to run this project

Install DynamoDB locally [DynamoDD documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html).

Once you install it, run this command on your CMD (set your own paths):

Windows:

```
java -D"java.library.path=C:\Users\Wesdell\workspace\dynamodb_local\DynamoDBLocal_lib" -jar C:\Users\Wesdell\workspace\dynamodb_local\DynamoDBLocal.jar -sharedDb -dbPath C:\Users\Wesdell\workspace\dynamodb_local\dbs_data\udemi
```

Then, go inside **udemi_server** and **udemi_client** directories and run this in both:

```
npm run dev
```

### Clerk configuration

Create a Clerk application by just accepting **Email** **Google** **GitHub** as sign in options.

Sign in on Udemi via Clerk with two different accounts. Then, go to your application dashboard on Clerk, navigate to the **Users** tab, and change your users _Metadata_.

First account:

```
{
  "userType": "teacher"
}
```

Second account:

```
{
  "userType": "student"
}
```

After that, navigate to **Configure** -> **Sessions** -> **Claims** and paste this:

```
{
  "metadata": "{{user.public_metadata}}"
}
```

## Set up AWS

Once you create your AWS account _(Root Account)_, you first must setup a Budget in order to not be charged for the services you are going to use and an IAM user to configure those services (is not recommended to use the root account to create resources).

### Billing and Cost Management

Create a zero spend budget:

![Budget configuration](/assets/Budget.png)

### Identity and Access Management (IAM)

Create an IAM user:

![IAM configuration](/assets/iam-user.png)

Create IAM Roles for Lambda and API Gateway:

Lambda role:
![IAM role for Lambda](/assets/iam-role-lambda.png)

API Gateway role:
![IAM role for API Gateway](/assets/iam-role-apigateway.png)

Finally we create access keys to have access to AWS via CLI:
![IAM user access keys](/assets/iam-access-keys.png)

### Access AWS via Command Line Interface (CLI)

Open a terminal and run:

```
aws configure
```

Enter your credentials generated one step before.

### Elastic Container Registry (ECR)

Create a repository:
![ECR repository configuration](/assets/ecr-repository.png)

Navigate to the _udemi-client_ folder and run all push commands on the console:
![ECR push commands](/assets/ecr-push-commands.png)

Check if the image was upload successfully on your repo.

### Lambda

Create the lambda function:
![Lambda function](/assets/lambda-function.png)

Test lambda function with this configuration and check if you get a successful message from it:
![Lambda test event](/assets/lambda-event-1.png)

Change lambda timeout by setting it up to 5 minutes:
![Lambda configuration](/assets/lambda-config.png)

Add environment variables:
![Lambda configuration](/assets/lambda-env-1.png)

### DynamoDB

Run another event but this time to seed mock data to Dynamo DB:

![Lambda seed event](/assets/lambda-event-2.png)

Check out on DynamoDB the tables and its items:
![DynamoDB tables](/assets/dynamodb-tables.png)

### API Gateway

First navigate to the API Gateway service and create a REST API with this configuration:
![API Gateway REST API](/assets/api-gateway.png)

Then create a resource:
![API Gateway Resource](/assets/api-gateway-resource.png)

The select _ANY_ and click edit integration:
![API Gateway Resource](/assets/api-gateway-integration-1.png)
![API Gateway Resource](/assets/api-gateway-integration-2.png)

Finally, click on Deploy API:
![API Gateway Resource](/assets/api-gateway-deploy.png)

### Frontend Deployment

Go to Vercel and add a new project on this way:
![Frontend deploy part 1](/assets/vercel-1.png)
![Frontend deploy part 1](/assets/vercel-2.png)
![Frontend deploy part 1](/assets/vercel-3.png)

Remember to set up your NEXT_PUBLIC_API_BASE_URL with this format:

```
https://{your-api-gateway-invoke-url}
```

Remember to set up your NEXT_PUBLIC_LOCAL_URL with this format:

```
https://{your-vercel-app-url}
```

### S3

Setup an S3 bucket by just defining its name.
![S3 Bucket configuration](/assets/s3-bucket.png)

Then edit S3 bucket CORS with this:
![S3 Bucket CORS](/assets/s3-cors.png)

### CloudFront

Create a distribution on CloudFront with this configuration:
![CloudFront distribution part 1](/assets/cloudfront-1.png)
![CloudFront distribution part 2](/assets/cloudfront-2.png)
![CloudFront distribution part 3](/assets/cloudfront-3.png)

### Edit Lambda environment variables

Go to your Lambda function again an add two more env variables:
![Edit Lambda environemnt variables](/assets/lambda-env-2.png)

Remember to set up your CLOUDFRONT_DOMAIN with this format:

```
https://{your-cloudfront-domain-name}
```
