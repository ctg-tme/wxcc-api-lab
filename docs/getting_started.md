# Getting Started

## Learning Objectives

By the end of this lab, you will be able to:

- Interact with Webex Contact Center (WxCC) APIs using Bruno (or Postman).
- Use APIs from within the WxCC Flow Designer.
- Invoke APIs from a Webex Connect flow using custom nodes.
- Apply APIs to real-world use cases including Campaign Manager, Scheduled Callbacks, Search, and Event Subscriptions.

## Lab Duration

This is a **4-hour hands-on lab**. Each module builds on the previous one, so please complete them in order.

## Disclaimer

The lab design and configuration examples are for instructional purposes. For design-related questions about your production environment, contact your Cisco representative or a Cisco partner.

---

## Lab Access

Use the POD number assigned by your instructor to look up your lab tenant details.

???+ webex "Find Your POD Information"
    Enter your POD number and the lab passcode provided by your instructor. Use the values shown throughout the lab.

    <div class="pod-lookup" id="pod-lookup">
      <div class="pod-lookup__controls">
        <div class="pod-lookup__field">
          <label class="pod-lookup__label" for="pod-number">POD Number</label>
          <input id="pod-number" class="pod-lookup__input" type="number" min="1" max="20" inputmode="numeric" placeholder="1-20" aria-describedby="pod-lookup-message">
        </div>
        <div class="pod-lookup__field">
          <label class="pod-lookup__label" for="pod-passcode">Lab Passcode</label>
          <input id="pod-passcode" class="pod-lookup__input pod-lookup__input--passcode" type="password" autocomplete="off" placeholder="Passcode">
        </div>
        <div class="pod-lookup__field pod-lookup__field--button">
          <button id="pod-lookup-button" class="pod-lookup__button" type="button">Show POD Info</button>
        </div>
      </div>
      <p id="pod-lookup-message" class="pod-lookup__message">Enter a number from 1 to 20.</p>

      <div id="pod-lookup-result" class="pod-lookup__result" hidden>
        <table>
          <tbody>
            <tr><th scope="row">POD Name</th><td><code id="pod-name"></code></td></tr>
            <tr><th scope="row">Org ID</th><td><code id="pod-org-id"></code></td></tr>
            <tr><th scope="row">Admin User</th><td><code id="pod-admin-user"></code></td></tr>
            <tr><th scope="row">Agent User</th><td><code id="pod-agent-user"></code></td></tr>
            <tr><th scope="row">Password</th><td><code id="pod-password"></code></td></tr>
            <tr><th scope="row">Control Hub</th><td><a id="pod-control-hub" href="https://admin.webex.com" target="_blank" rel="noopener">https://admin.webex.com</a></td></tr>
            <tr><th scope="row">Agent Desktop</th><td><a id="pod-agent-desktop" href="https://desktop.wxcc-us1.cisco.com" target="_blank" rel="noopener">https://desktop.wxcc-us1.cisco.com</a></td></tr>
            <tr><th scope="row">Campaign Manager</th><td><a id="pod-campaign-url" href="#" target="_blank" rel="noopener"></a></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    !!! warning "Use Your Assigned POD"
        Do not use another attendee's POD credentials. The Org ID, users, and Campaign Manager URL are unique to each POD.

---

## Step 1: Download and Import the API Collection

The collection contains all pre-configured API requests you will use during the lab. Bruno is already installed on your lab laptop.

### Download the Collection

- **Bruno collection (recommended):** <a href="../assets/WxCC_API_Attendee.zip" download>Download Bruno Collection</a>
- **Postman collection (alternative):** <a href="../assets/WxCC%20API%20Postman.json" download>Download Postman Collection</a>

!!! tool "Bruno vs. Postman"
    All screenshots, steps, and instructions in this lab guide are written for **Bruno**. If you choose to use Postman instead, you will need to translate the steps to the Postman interface on your own.

### Import the Collection into Bruno

1. Open the Bruno application from your lab laptop.
2. In the left sidebar, click the **+** sign next to the **Collections** section.
3. Click the **Import Collection** button (folder-with-arrow icon).
4. In the import dialog, either drag-and-drop the collection or browse to the location where you saved the file and select it.
5. Choose a destination folder on the local machine where Bruno will store the collection files.
6. Click **Import**. The `WxCC API` collection should now appear in your Collections list.

???+ tip "Visual reference"
    <figure markdown>
    ![Bruno Import](./assets/bruno_getting_started.gif)
    </figure>

---

## Step 2: Verify Access to developer.webex.com

Several lab modules require API keys generated from the Webex for Developers portal.

1. Open a browser and navigate to <a href="https://developer.webex.com" target="_blank">https://developer.webex.com</a>.
2. Click **Log In** in the top-right corner.
3. Sign in using the **admin credentials** provided for your POD.
4. Once logged in, confirm that you can see your name in the top-right corner of the page.

!!! warning "Lab Admin Account"
    Do not log in with your personal Cisco or Webex account. All API keys must be generated against the lab tenant.

---

## Step 3: Verify Access to the WxCC Tenant

1. Open a new browser tab and navigate to <a href="https://admin.webex.com" target="_blank">https://admin.webex.com</a>.
2. Sign in using the **admin credentials** provided for your POD.
3. In the left navigation pane, scroll to **Services** and click **Contact Center**.
4. Confirm the Contact Center landing page loads without errors.

---

## Step 4: Verify Access to Webex Campaign Manager

1. Open a new browser tab and navigate to the **Campaign Manager URL** provided for your POD.
2. Sign in using the **admin credentials** provided for your POD.
3. Confirm the Campaign Manager dashboard loads.

---

## You're Ready!

Once you have completed all the steps above, you are ready to begin **Lab 1 - Using Bruno to interact with WxCC**.

Use the navigation menu on the left to proceed.
