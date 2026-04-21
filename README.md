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
