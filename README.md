
---

# **Decentralized AI Training Platform**

## **Overview**  
This platform enables **decentralized AI model training** by connecting users with GPU providers to securely upload training scripts. The backend is powered by Node.js, the frontend is built with Next.js, and blockchain functionalities are handled via the **Aptos blockchain**. Users can rent out unused GPU resources, and AI models are executed within **Docker containers** for security and isolation.

---

## **Project Structure**  
- **frontend/** – Contains the Next.js frontend for user interaction.
- **backend/** – Node.js backend managing API requests, task scheduling, and blockchain integration.

---

## **Setting Up the Project**

### **1. Prerequisites**  
Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (or Yarn)
- **Docker** (for isolated model training)
- **Petra Wallet** (for Aptos blockchain authentication)

---

### **2. Frontend Setup**

#### **Step 1: Clone the repository**  
```bash
git clone https://github.com/your-username/decentralized-ai-training.git
cd decentralized-ai-training/frontend
```

#### **Step 2: Install dependencies**  
```bash
npm install
```

#### **Step 3: Set Environment Variables**  
Create a `.env.local` file in the `frontend` directory with the following configuration:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000  # Backend API URL
NEXT_PUBLIC_AIRTABLE_API_KEY=<YOUR_API_KEY>  # Replace with your Airtable API Key (or any other relevant API)
```

#### **Step 4: Petra Wallet Configuration**
In the frontend, ensure **Petra Wallet** is set up for Web3 authentication with Aptos:
- Install the **Petra extension** on your browser.
- Integrate **Petra Wallet** for decentralized sign-in.

You can do this in the frontend by adding the **Aptos client** for Web3:
```bash
npm install @aptos-labs/aptos
```

In your `frontend` code, include the Web3 integration:
```js
import { AptosClient } from '@aptos-labs/aptos';

const client = new AptosClient('<APTOS_NODE_URL>');
```

#### **Step 5: Start the frontend**  
```bash
npm run dev
```
Visit `http://localhost:3000` to view the application.

---

### **3. Backend Setup**

#### **Step 1: Clone the repository**  
```bash
git clone https://github.com/your-username/decentralized-ai-training.git
cd decentralized-ai-training/backend
```

#### **Step 2: Install dependencies**  
```bash
npm install
```

#### **Step 3: Set Environment Variables**  
Create a `.env` file in the `backend` directory with the following configuration:
```bash
PORT=5000  # Backend API Port
AI_MODEL_API_KEY=<YOUR_API_KEY>  # API key for your AI model service
MONGO_URI=mongodb://localhost:27017/your-database  # MongoDB connection URI
APTOS_PRIVATE_KEY=<YOUR_PRIVATE_KEY>  # Aptos wallet private key for transactions
```

#### **Step 4: Start the backend**  
```bash
npm run start
```
This will run the backend on `http://localhost:5000`.

---

## **Using the AI Model**

### **1. Input the API Key**  
To interact with the AI model, input your **API key** in the backend and frontend environment configuration as described earlier.

### **2. Uploading the Model for Training**

- **Frontend**: Users can upload their training scripts (e.g., Python `.py` files) through a user-friendly interface.
- **Backend**: The backend accepts uploaded models and triggers the corresponding provider’s GPU resources for execution.

### **3. Execute the Training**

When the user submits a model, the backend handles:
- **AI model script execution** via Docker containers.
- **Tracking GPU usage** and compensating the provider via blockchain.
  
To start the training, the backend interacts with the **AI model service**, sending the script and receiving output once completed.

### **4. Retrieving Results**  
After the model completes, the results (such as logs or trained model files) are sent back securely to the user via the frontend.

---

## **How To Use the Platform**

1. **Sign in with Web3 Wallet**: Users authenticate using **Petra Wallet** (Aptos blockchain wallet) for decentralized authentication.
2. **Become a Provider**: If you have unused GPU power, you can contribute your resources to the platform and start earning.
3. **Submit a Training Task**: AI researchers can submit their models to be trained on the available GPU resources.
4. **Track Task Progress**: The backend tracks the progress of the training task and ensures accurate compensation for providers.
5. **Retrieve the Trained Model**: Once the training is complete, the user can download the trained AI model.

---

## **Troubleshooting**

- **Model Fails to Load**: Ensure the API key is correctly set in the `.env` file, and that the backend is properly connected to the AI model service.
- **Docker Errors**: Make sure Docker is installed and running. You can check if Docker is working correctly by running `docker ps` to see the active containers.
- **Blockchain Issues**: Ensure your **Aptos wallet** is configured correctly and has sufficient balance for transaction fees.

---

## **Contributing**  
Feel free to fork the repository and make contributions! Please submit pull requests with detailed descriptions of the changes you have made.

---

## **License**  
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

### **Contact**  
For any issues or inquiries, feel free to **contact our support team** at [your-email@example.com].

--- 
