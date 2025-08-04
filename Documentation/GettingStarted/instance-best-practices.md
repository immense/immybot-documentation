<!-- How To Template -->
# Instance Best Practices

## Overview
This page outlines the supported instance configurations to ensure that your ImmyBot instance is as stable as possible.

## Prerequisites
You will need admin permissions to your ImmyBot instance for some processes. Those processes will be marked with an astrisk '*'.

## Scheduled Maintenance Sessions
### Run scheduled maintance once a week at most
- We advise running scheduled maintanance at most once a week across your instance. This will help aleviate resource utilization. If you have more then 1000 computers in your instance, or are constrained by the number of sessons available, you should schedule batches of computers to run on different days.
- This does not include ad-hoc sessions. The point of this guidance is to ensure that if you need to deploy a maintanance item on the fly, you will have the resources to do so.
### Run full Maintenance where possible
- Avoid using schedules for individual deployments. It is best practice to use as few schedules as possible. Focus on full maintenance, cross tenant schedules and deployments

<!-- We need to add more here. Cross tenant, Cross tenant tags, and when to use individual deployments-->
## Deployments
### Use cross tenant deployments
- All deployments should be cross tenant that filter down, except for one off situations.

### PSA agreement additions

::: info Not available for all PSAs
Currently only available for ConnectWise Manage and HaloPSA
:::
- The PSA integrations have the ability to allow you to filter down from agreement additions. If you resell a platform such as SentinelOne, and there is an agreement addition for it, you can set up a cross tenant deployment that will ensure that it's installed while you only have to set up one deployment
  ::: details What if I need to do a targeted roll out of this platfom?
  You have 2 options.
  1. Ensure the start date for the service is correct in your PSA, ImmyBot does not deploy on inactive agreement additions.
  2. Otherwise you can set a tenant specific deployment to ignore that platform, and delete it the day before you're supposed to deploy the platform.

### Utilize a Canary Tag and Schedule to catch issues before wide release
- Create a tag and name it Canary, create an schedule and apply it only the the Canary Tag.
- Apply the tag to a predetermined group of computers in each tenant, and push maintance to those computers first before the rest of the tenants. This allows you to get ahead of any issues that may come up. You will need to build internal processes around this as far as reviewing the canary sessions.

## Cross Platform Standardization
### Tenant names and slugs should match across all of your platforms
- This is to help ensure that the standardization you're aiming for is achieved via ImmyBot

## Ensuring Email Deliverability



- Use an authenticated SMTP Relay service
- To help ensure deliverability, you should not [spoof](https://en.wikipedia.org/wiki/Email_spoofing) a sending domain.
- You should also have SPF and DMARC set up for the sending domain.
- You don't need to add ImmyBot IP addresses to your SPF record
- You don't need to whitelist any ImmyBot IPs unless you have strict access controls in place.


<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 2025/07/11
><br>
>Date Revised: N/A
><br>
 Version Number: 1.0