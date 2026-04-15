# Udemi App

This is a learning management application developed using NextJS, Clerk, Stripe, TypeScript, and some AWS services like **S3**, **DynamoDB**, **IAM**, **Budgets**, **ECR**, **Lambda**, **API Gateway**, and **CloudFront**.

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
