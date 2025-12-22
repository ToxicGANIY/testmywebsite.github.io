#disclaimerOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.999);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* выше всего остального */
}

#disclaimerBox {
  background: #222;
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
}

#captchaInput {
  padding: 5px;
  margin-top: 10px;
  width: 80%;
  text-align: center;
}

#captchaBtn {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: #6a0dad;
  color: white;
  cursor: pointer;
}
