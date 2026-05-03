# ECO Web App — Full Production & Staging Deployment on Azure
A complete Node.js application deployed on Azure App Service with isolated SQL databases, private networking, monitoring, and automated CI/CD.



## 📘 Project Overview
A full Node.js web application running on Azure App Service, backed by two SQL databases, secured with private endpoints, monitored through Log Analytics, and deployed automatically using GitHub Actions and Terraform.

This architecture is designed for speed, safety, and reliability.

## 🏗️ Architecture Diagram
 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/ChatGPT%20Image%20May%203,%202026,%2002_23_20%20PM.png?raw=true)

## 🚀 Environments
### Production Environment

Live version used by real customers

 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/Screenshot%20from%202026-05-03%2013-50-58.png?raw=true)

- Connected to Production SQL Database

- Runs on App Service Production Slot

- Fully monitored through Log Analytics

Production Slot  

 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/proslot.png?raw=true)

Production Database

![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/databaseprod.png?raw=true)

------------------------------------------------------------------------------------------------------------------------
### Staging Environment
 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/Screenshot%20from%202026-05-03%2013-51-03.png?raw=true)
 
- Safe testing environment

- Connected to Staging SQL Database

- Runs on App Service Staging Slot

- Mirrors production for accurate testing

Staging Slot
 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/stagslot.png?raw=true)

Staging Database
 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/sta.png?raw=true)



## 🛡️ Security & Networking
Your application is secured using:

-  Private SQL databases (no public internet access)

-  Private Endpoints for secure communication

-  Private DNS Zone for internal name resolution

-  Virtual Network for isolation

 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/Screenshot%20from%202026-05-03%2013-51-52.png?raw=true)

## 📊 Monitoring & Logging
Connected to Azure Log Analytics Workspace:

-  Request logs

-  Error logs

-  Performance metrics

-  SQL insights
  
To show all requests in kQl mode
```
AppServiceHTTPLogs
| where TimeGenerated > ago(24h)
| project TimeGenerated, CsMethod, CsUriStem, ScStatus, TimeTaken, UserAgent
| order by TimeGenerated desc
```
 Log Analytics Workspace
 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/Screenshot%20from%202026-05-03%2013-51-52.png?raw=true)

 -----------------------------------------------------------------------------------------------------------------------
 
## ⚙️ CI/CD Pipelines
Production Deployment
Triggered when pushing to the main branch:

-  Builds Node.js app

-  Uploads artifact

-  Deploys to Production slot

-  Zero downtime

```
# deploy-prod.yml
name: Deploy to Production

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ secrets.AZURE_PROD_APP }}
          publish-profile: ${{ secrets.AZURE_PROD_PUBLISH }}
          package: .

```

Staging Deployment
Triggered when pushing to the bakry branch:

-  Builds Node.js app

-  Deploys to Staging slot

```
# deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [ "bakry" ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ secrets.AZURE_STAGING_APP }}
          publish-profile: ${{ secrets.AZURE_STAGING_PUBLISH }}
          package: .

```
Terraform Infrastructure
Triggered manually or when pushing to the infra branch:

-  Creates all Azure resources

-  Modular and reusable

-  Safe, repeatable deployments

```
# terraform.yml
name: Terraform Infrastructure

on:
  workflow_dispatch:
  push:
    branches: [ "infra" ]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.6.6
      - uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_TF_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TF_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_TF_SUBSCRIPTION_ID }}
      - run: terraform init
        working-directory: ./terraform
      - run: terraform plan -var-file="env/prod.tfvars"
        working-directory: ./terraform
      - run: terraform apply -auto-approve -var-file="env/prod.tfvars"
        working-directory: ./terraform

```

## 🧩 Key Features
Two isolated environments (Production & Staging)

-  Two SQL databases

-  Zero‑downtime deployments

-  Private networking (no public SQL access)

-  Full monitoring & logging

-  Modular Terraform infrastructure

-------------------------------------------------------------------------------------
## 📦 Deployment Instructions
1. Deploy Infrastructure
   Use `git remote -v` to check your remotes.

`Code`
```
cd terraform
terraform init
terraform plan -var-file="env/prod.tfvars"
terraform apply -var-file="env/prod.tfvars"
```
3. Deploy Application
Push to:

- main → Production

- bakry → Staging

- GitHub Actions handles the deployment automatically.



📬 Contact
Abubakar — Cloud Engineer & Azure Administrator  
Building secure, scalable, and automated cloud solutions
email:abubakaralnour43@gmail.com .
