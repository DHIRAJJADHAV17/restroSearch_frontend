Frontend Workflow Documentation
===============================

Project Overview
----------------

The restaurant app allows users to:

- Search for restaurants by name and location.
- View detailed information and reviews about specific restaurants.
- Add their own restaurants.
- Manage restaurant details, including updating cuisines, adding/removing menus, and reviews.

Tech Stack
----------

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **TypeScript**: For type safety

Project Repo
------------

To deploy your Next.js project with static assets onto AWS S3 and serve it via CloudFront CDN, follow these steps:

1. Prepare Your Project
-----------------------

Build Your Next.js Project
^^^^^^^^^^^^^^^^^^^^^^^^^^

Build your Next.js application for production:

.. code-block:: bash

    # In your next.config.js file
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: "export",
    };

    export default nextConfig;

And save and build the project with:

.. code-block:: bash

    npm run build

This will generate a static site in the `out` directory.

2. Create and Configure S3 Bucket
---------------------------------

Create an S3 Bucket
^^^^^^^^^^^^^^^^^^^

- Go to the AWS Management Console.
- Navigate to the S3 service.
- Click on "Create bucket."
- Give your bucket a name (e.g., `my-restaurant-app-static`) and select a region.
- Configure bucket settings as needed.

Upload Files
^^^^^^^^^^^^

- Go to your bucket and click on "Upload."
- Upload the contents of the `out` directory to the S3 bucket.
- Ensure that all files are uploaded to the root of the bucket.

Configure Bucket Policy
^^^^^^^^^^^^^^^^^^^^^^^

- Go to the Permissions tab of your bucket.
- Click on "Bucket Policy" and add the following policy to make your bucket public:

.. code-block:: json

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::Bucket-Name/*"
                ]
            }
        ]
    }

Enable Static Website Hosting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Go to the Properties tab of your bucket.
- Scroll down to "Static website hosting" and click "Edit."
- Enable static website hosting and set the index document to `index.html` and the error document to `404.html` (if applicable).
- Save the changes.
- You can check whether it's hosted or not through the link provided below the "Enable static website hosting" section.

3. Set Up CloudFront Distribution
---------------------------------

Create CloudFront Distribution
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Go to the AWS Management Console.
- Navigate to the CloudFront service.
- Click on "Create Distribution."
- Under the Web section, click on "Get Started."

Configure Distribution Settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- **Origin Settings**:
  - **Origin Domain Name**: Select your S3 bucket from the dropdown list.
  - **Origin Path**: Leave empty.
  - **Origin ID**: This will be filled automatically.

- **Restrict Bucket Access**: Choose "Yes" if you want to restrict access to the bucket through CloudFront only.

- **Origin Access Control Policy**: Create or select an existing policy if restricted access is chosen.

- **Default Cache Behavior Settings**:
  - **Viewer Protocol Policy**: Set to "Redirect HTTP to HTTPS" or "HTTPS Only."
  - **Allowed HTTP Methods**: Select `GET`, `HEAD`.

- **Distribution Settings**:
  - **Price Class**: Choose based on your geographic needs.
  - **Alternate Domain Names (CNAMEs)**: Add your custom domain if using one.
  - **SSL Certificate**: Select "Default CloudFront Certificate" or upload a custom certificate if using a custom domain.

Create the Distribution
^^^^^^^^^^^^^^^^^^^^^^^

- Review the settings and click "Create Distribution."
- It may take some time for CloudFront to deploy the distribution.

Update DNS (if using a custom domain)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Go to your DNS provider and set up a CNAME record pointing to the CloudFront distribution domain name.

4. Verify Deployment
--------------------

Test S3 Bucket
^^^^^^^^^^^^^^

- Access your bucket’s static website URL (found in the bucket properties) to ensure that your files are accessible.

Test CloudFront Distribution
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Access the CloudFront distribution domain name to verify that your site is being served correctly.
