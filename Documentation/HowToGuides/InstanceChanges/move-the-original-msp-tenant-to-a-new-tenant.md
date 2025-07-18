<!-- How To Template -->
# Move the Original MSP Tenant to a New Tenant

## Overview and or Objective
This document is intended to walk you through the process of changing the primary MSP tenant in your ImmyBot instance. Use cases would primaraly be if the entity that is purchasing ImmyBot is going through a buyout, and you need to change Azure environemnt so you can take down the old company's Azure environment, or the company is going through a rebrand and you need to work on changing email addresses.

## Prerequisites
1. 2 MSP admins for the ImmyBot instance

## Process

::: info Assumptions
For the sake of this document, we are going to refer to the old tenant as Tenant A, and the new tenant as Tenant B. <br>
We are also going to assume that you can create, edit and delete Deployments, Computers, Users, etc where necessary
:::

### Step 1. Create a new ImmyBot Tenant and make it an MSP tenant
   1. If you manage tenants through an integration, please use the integration to create the tenant otherwise go to **Tenants** > **New** and fill out the required information.
   2. Once the tenant is created, edit the tenant and check the box **Is MSP?** in the **Preferences** tab.
### Step 2. Connect the new tenant to the new Azure environment
   1. Edit the tenant and navigate to the Azure tab. Input the required Azure tenant ID here. There is a link  on screen if you need help finding it. This should be the new Azure environment
### Step 3. Move tenant level deployments, maintenance items, tags, etc
   1. All of these can be edited and moved via the tenant selection on each individual item.
### Step 4. Move the MSP users and MSP Admins to the new tenant
   1. Delete one user at a time, update the person object's AD External ID and then recreate the user from the person.
   2. Delete one admin at a time, update the person object's AD External ID and then recreate the admin from the person
      1. This is where you utlize the second admin from the prereqs. You will need to switch to that admin, delete your admin, fix your person and then recreate your admin.
### Step 5. Move the computers
   1. You can batch action this from the **Tenant** > **Computer** tab
### Step 6. Decomm the old tenant
   1. Remove the Azure ID. You can delete the tenant if you wish.


<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 2025/07/17
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0
