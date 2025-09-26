# System Status

## Overview
This document is intended to go over the information in the System Status page

## Prerequisites
An active ImmyBot subscription or [trial](https://www.immy.bot/pricing/)

## Navigation

### Getting to the System Status Page

**Show More** > **System Status**

## On this page

This page shows information regarding you're ImmyBot instance. This some of the page information is depended on which integrations you have set up.

::: info
Not all tiles will be viewable until it has data available to present. Ex, if you have no Ephemeral Agents that have completed, you will not see the Ephemeral Agent Lifespan Histogram, as that data is calculated once it has ended.
:::

| Context                         | Title                                                              | Description                                                      |
| ------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Computer Inventory              | Script Errors                                                      | Tracks failed script executions on computers                     |
| Computer Inventory              | Script Successes                                                   | Tracks successful script executions on computers                 |
| Computer Inventory              | Script Errors Waiting to be Processed                              | Queue of script errors pending processing                        |
| Computer Inventory              | Script Successes and Errors Being Processed                        | Script results currently being processed                         |
| Computer Inventory              | Script Successes Waiting to be Processed                           | Queue of successful scripts pending processing                   |
| Computer Inventory              | Total Processed Script Errors                                      | Total count of all processed script errors                       |
| Computer Inventory              | Total Processed Script Successes                                   | Total count of all processed successful scripts                  |
| Application Feature Usage       | devices-with-scheduled-maintenance                                 | Tracks usage of the scheduled maintenance feature                |
| Application Feature Usage       | simultaneous-immy-agent-remote-control-sessions                    | Monitors concurrent remote control sessions                      |
| Ephemeral Agent Session Handler | Completed Ephemeral Sessions                                       | Count of finished ephemeral agent sessions                       |
| Ephemeral Agent Session Handler | Created Ephemeral Sessions                                         | Count of newly created ephemeral sessions                        |
| Ephemeral Agent Session Handler | Force-Terminated Zombie Sessions                                   | Sessions that were forcibly terminated due to being unresponsive |
| Ephemeral Agent Session Handler | Total Actively Connected Sessions                                  | Current number of active session connections                     |
| Ephemeral Agent Session Handler | Total Backend egress rate                                          | Data flow rate from backend to external systems                  |
| Ephemeral Agent Session Handler | Total Backend Ingress rate                                         | Data flow rate into the backend system                           |
| Ephemeral Agent Session Handler | Total Sessions                                                     | Overall count of all sessions                                    |
| Ephemeral Agent Session Handler | Agent->Backend session ingress rate                                | Data transfer rate from agents to backend                        |
| Ephemeral Agent Session Handler | Backend->Agent session egress rate                                 | Data transfer rate from backend to agents                        |
| Ephemeral Agent Session Handler | Ephemeral Agent Lifespan                                           | Duration statistics for ephemeral agent lifecycles               |
| Ephemeral Agent Session Handler | Ephemeral Agent Lifespan Executions                                | Execution metrics during ephemeral agent lifetime                |
| Ephemeral Agent Session Handler | Ephemeral Lifespan Agent->Backend Data                             | Data transferred from agent to backend during agent lifespan     |
| Ephemeral Agent Session Handler | Ephemeral Lifespan Backend->Agent Data                             | Data transferred from backend to agent during agent lifespan     |
| Ephemeral Agent Session Handler | Agent->Backend Script Bytes Received                               | Volume of script data received from agents                       |
| Application Database            | Total Computers In Database                                        | Count of all computers stored in the database                    |
| Application Database            | Total Computers Without Agents In Database                         | Count of computers that don't have agents installed              |
| Application Database            | Total Maintenance Sessions In Database                             | Count of all maintenance sessions recorded in database           |
| Application Database            | Total Maintenance Sessions In Database Status Pending Connectivity | Maintenance sessions waiting for network connection              |
| Application Database            | Total Maintenance Sessions In Database Status Running              | Currently active maintenance sessions                            |
| Application Database            | Total Provider Agents In Database                                  | Count of provider agents stored in database                      |
| Session Objects                 | Maintenance Action Updates Being Processed                         | Maintenance action updates currently being processed             |
| Session Objects                 | Maintenance Action Updates Waiting to be Processed                 | Queue of maintenance action updates awaiting processing          |
| Session Objects                 | Maintenance Session Stage Updates Being Processed                  | Session stage updates currently being processed                  |
| Session Objects                 | Maintenance Session Stage Updates Waiting to be Processed          | Queue of session stage updates awaiting processing               |
| Session Objects                 | Maintenance Session Updates Being Processed                        | Session updates currently being processed                        |
| Session Objects                 | Maintenance Session Updates Waiting to be Processed                | Queue of session updates awaiting processing                     |
| Session Objects                 | Session Log Inserts Being Processed                                | Session log entries currently being inserted                     |
| Session Objects                 | Session Log Inserts Waiting to be Processed                        | Queue of session log entries awaiting insertion                  |
| Session Objects                 | Session Phase Updates Being Processed                              | Session phase updates currently being processed                  |
| Session Objects                 | Session Phase Updates Waiting to be Processed                      | Queue of session phase updates awaiting processing               |
| Session Objects                 | Session Logs Per Bulk Insert                                       | Number of log entries processed in each bulk insert operation    |
| Session Objects                 | Total Processed Maintenance Action Updates                         | Total count of completed maintenance action updates              |
| Session Objects                 | Total Processed Maintenance Session Stage Updates                  | Total count of completed session stage updates                   |
| Session Objects                 | Total Processed Maintenance Session Updates                        | Total count of completed session updates                         |
| Session Objects                 | Total Processed Session Log Inserts                                | Total count of completed session log insertions                  |
| Session Objects                 | Total Processed Session Phase Updates                              | Total count of completed session phase updates                   |
| appmetrics.internal             | report.success                                                     | Internal metrics tracking successful report generation           |
| Notification Saver Service      | Notification Event Rate                                            | Rate at which notification events are occurring                  |
| Notification Saver Service      | Notification Save Rate                                             | Rate at which notifications are being saved                      |
| Notification Saver Service      | Notification Events Received                                       | Count of notification events received by the service             |
| Notification Saver Service      | Notifications Saved                                                | Count of notifications successfully saved                        |
| ImmyBot Agent Hub               | Agent Connect Rate                                                 | Rate at which agents are connecting to the hub                   |
| ImmyBot Agent Hub               | Agent Disconnect Rate                                              | Rate at which agents are disconnecting from the hub              |
| ImmyBot Agent Hub               | Total Connections                                                  | Current total number of agent connections                        |
| ImmyBot Agent Hub               | Total Sessions                                                     | Total number of sessions managed by the hub                      |
| ImmyBot Agent Hub               | Script Runs                                                        | Number of scripts executed through the agent hub                 |
| Azure Error Saver Service       | Azure Error Event Rate                                             | Rate at which Azure error events are occurring                   |
| Azure Error Saver Service       | Azure Error Save Rate                                              | Rate at which Azure errors are being saved                       |
| Azure Error Saver Service       | Azure Error Events Received                                        | Count of Azure error events received by the service              |
| Azure Error Saver Service       | Azure Errors Saved                                                 | Count of Azure errors successfully saved                         |

<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 09/19/2025
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0
