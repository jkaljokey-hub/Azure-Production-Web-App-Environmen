# Cloud-Based Multi-Environment Application

## 📘 Project Overview
A full Node.js web application running on Azure App Service, backed by two SQL databases, secured with private endpoints, monitored through Log Analytics, and deployed automatically using GitHub Actions and Terraform.

### What You Gain From This Project
-  High availability — your web app runs across isolated environments (Production & Staging) so updates never interrupt users.

-  Instant monitoring — you can see logs, failures, and performance issues in real time through Azure Log Analytics.

-  Reliable deployments — every change goes through a safe staging slot before reaching production, preventing downtime.

-  Secure architecture — private networking, protected SQL databases, and controlled access reduce attack surfaces.

-  Faster troubleshooting — connection failures, slow queries, and app errors appear immediately in your dashboards.

-  Scalable design — the app can grow with more users without changing the architecture.

-  Automated workflows — GitHub Actions handles deployments, so you don’t need to deploy manually.
   This architecture is designed for speed, safety, and reliability.


## 🏗️ Architecture Diagram
 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/ChatGPT%20Image%20May%203,%202026,%2002_23_20%20PM.png?raw=true)

## 🚀 Environments
### 1.Production Environment

Live version used by real customers

 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/Screenshot%20from%202026-05-03%2013-50-58.png?raw=true)

- Connected to Production SQL Database

- Runs on App Service Production Slot

- Fully monitored through Log Analytics

Production Slot  

 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/proslot.png?raw=true)

Production Database

![ERP Azure Architecture](https://github.com/jkaljokey-hub/Cloud-Based-Multi-Environment-Application/blob/main/terraform/assets/prdb.png?raw=true)

------------------------------------------------------------------------------------------------------------------------
### 2.Staging Environment
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

 ![ERP Azure Architecture](https://github.com/jkaljokey-hub/Azure-Production-Web-App-Environmen/blob/main/terraform/assets/end.png?raw=true)

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
