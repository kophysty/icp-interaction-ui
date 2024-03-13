

const express = require('express');
const { Actor, HttpAgent } = require('@dfinity/agent');


const app = express();
const port = 3000;

// Build IDL actor 
const idlFactory = ({ IDL }) => {
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpResponse = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader)
  });
  const HttpTransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponse
  });
  return IDL.Service({
    'countScore' : IDL.Func([IDL.Text], [IDL.Float64], []),
    'getScore' : IDL.Func([IDL.Text], [IDL.Float32], ['query']),
    'xkcdTransform' : IDL.Func([HttpTransformArgs], [HttpResponse], ['query']),
  });
};

const canisterId = "dx56p-yiaaa-aaaan-qejwa-cai";
const actor = Actor.createActor(idlFactory, { agent, canisterId });

// Endpoint for getting wallet 
app.get('/get-score', async (req, res) => {
  const walletId = req.query.walletId;
  if (!walletId) {
    return res.status(400).send('Wallet ID is required');
  }

  try {
    const score = await getScore(walletId); // Use getScore function
    res.json({ walletId, score });
  } catch (error) {
    res.status(500).send(`Error fetching score: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});