""" import json
import os
from langchain_openai import OpenAIEmbeddings
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain_core.documents import Document
from uuid import uuid4
from langchain_community.document_loaders import JSONLoader
from pathlib import Path


# Load environment variables

openai_api_key = 'sk-proj-cI3nyiBec0Km7NSAcMS2T3BlbkFJStuXiy6CH7Z2uKszSzQJ'
pinecone_api_key = 'ff58b24c-bd7c-4113-943a-7c9b74f930fe'  # Add your Pinecone API key
index_name = 'rag'  # Add your Pinecone API key

# Initialize OpenAIEmbeddings and Pinecone client
embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=openai_api_key)
pinecone_client = Pinecone(api_key=pinecone_api_key)
index = pinecone_client.Index(index_name)

# Define file path
file_path = './reviews.json'

# Load data from JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

def split_into_chunks(data, chunk_size):
    if isinstance(data, dict):
        data = list(data.values())  # Convert dict values to a list
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    return chunks

# Convert each JSON object into a single string
def json_to_string(json_obj):
    return json.dumps(json_obj)  # Convert JSON object to string

# Convert data into chunks
chunks = split_into_chunks(data, chunk_size=1)

loader = JSONLoader(
    file_path='./reviews.json',
    jq_schema='.[]',
    text_content=False)

data = loader.load()

vector_store = PineconeVectorStore(index=index, embedding=embeddings)

uuids = [str(uuid4()) for _ in range(len(data))]

vector_store.add_documents(documents=data, ids=uuids) """

"""import json
import torch
from transformers import AutoTokenizer, AutoModel
from pinecone import Pinecone
from uuid import uuid4

# Load environment variables
huggingface_model_name = 'bert-base-uncased'  # Replace with your desired model
pinecone_api_key = '0a08e41d-3496-4ed7-ab13-cc523e053940'
index_name = 'prof'  # Your Pinecone index name

# Initialize Hugging Face tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(huggingface_model_name)
model = AutoModel.from_pretrained(huggingface_model_name)

# Function to get embeddings from Hugging Face model
def get_embeddings(texts):
    inputs = tokenizer(texts, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1)  # Mean pooling
    return embeddings.numpy()

# Initialize Pinecone client and index
pinecone_client = Pinecone(api_key=pinecone_api_key)
index = pinecone_client.Index(index_name)

# Define file path
file_path = './reviews.json'

# Load data from JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

def split_into_chunks(data, chunk_size):
    if isinstance(data, dict):
        data = list(data.values())  # Convert dict values to a list
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    return chunks

# Convert each JSON object into a single string
def json_to_string(json_obj):
    if isinstance(json_obj, dict):
        return json.dumps(json_obj)  # Convert JSON object to string
    return str(json_obj)  # Handle non-dict cases

# Convert data into chunks
chunks = split_into_chunks(data, chunk_size=1)

# Convert data into strings
texts = [json_to_string(doc) for doc in data]
uuids = [str(uuid4()) for _ in range(len(texts))]

# Get embeddings for the texts
embeddings = get_embeddings(texts)

# Add documents and embeddings to Pinecone index
for text, emb, uuid in zip(texts, embeddings, uuids):
    index.upsert(vectors=[(uuid, emb.tolist(),)])  # Convert numpy array to list"""
import json
import torch
from transformers import AutoTokenizer, AutoModel
from pinecone import Pinecone
from uuid import uuid4

# Load environment variables
huggingface_model_name = 'bert-base-uncased'  # Replace with your desired model
pinecone_api_key = '0a08e41d-3496-4ed7-ab13-cc523e053940'
index_name = 'prof'  # Your Pinecone index name

# Initialize Hugging Face tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(huggingface_model_name)
model = AutoModel.from_pretrained(huggingface_model_name)

# Function to get embeddings from Hugging Face model
def get_embeddings(texts):
    inputs = tokenizer(texts, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1)  # Mean pooling
    return embeddings.numpy()

# Initialize Pinecone client and index
pinecone_client = Pinecone(api_key=pinecone_api_key)
index = pinecone_client.Index(index_name)

# Define file path
file_path = './reviews.json'

# Load data from JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

# Function to split data into chunks
def split_into_chunks(data, chunk_size):
    if isinstance(data, dict):
        data = list(data.values())  # Convert dict values to a list
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    return chunks

# Convert each JSON object into a single string
def json_to_string(json_obj):
    if isinstance(json_obj, dict):
        return json.dumps(json_obj)  # Convert JSON object to string
    return str(json_obj)  # Handle non-dict cases

# Convert data into strings
texts = [json_to_string(doc) for doc in data]
uuids = [str(uuid4()) for _ in range(len(texts))]

# Get embeddings for the texts
embeddings = get_embeddings(texts)

# Add documents, embeddings, and metadata (which is the text itself) to Pinecone index
for text, emb, uuid in zip(texts, embeddings, uuids):
    index.upsert(vectors=[(uuid, emb.tolist(), {'text': text})])  # Include text as metadata
