import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import {AttendantWebSocket} from './websocket/attendant';
import './App.css';

let socket;
let clientOnRow = [];

let attendantWebSocket = new AttendantWebSocket(); 

function App() {
  
  const [socketId, setSocketId] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [newClient, setNewClient] = useState([]);
  const [clientsInAttendance, setClientsInAttendance] = useState([]);
  const [rowOfAttendance, setRowOfAttendance] = useState([]);
  const [lastClientInAttendance, setLastClientInAttendance] = useState({});
  const [myAttendances, setMyAttendances] = useState([]);
  const [currentClientInAttendance, setCurrentClientInAttendance] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientMessage, setClientMessage] = useState('');

  const handleGetOnline = () => {
    if(!isOnline){
      attendantWebSocket.on('connect');
      setIsOnline(true);
      setSocketId(attendantWebSocket.id);
    }else{
      attendantWebSocket.off('client_on_row');
      setIsOnline(false);
    }
  }

  const handleCloseSession = () => {
    attendantWebSocket.close();
  }

  const handleGethMyClients = (params) => {
    setMyAttendances([...myAttendances, ...[params]]);
  }

  const handleGetClientToAttendance = (params) => {
    attendantWebSocket.emit('get_client', params);
    handleGethMyClients(params);
  }

  const handleTalk = (client) => {
    //TODO pegar histórico de conversas do cliente
    // console.log(client);
    setCurrentClientInAttendance(client);
  }

  const handleSubmitMessage = (client) => {
    // console.log(attendantWebSocket.id);
    // console.log(client);
    const messageToShow = {
      text: message,
      hour: '20:00',
      isAttendant: true,
      to: client.from,
      from: attendantWebSocket.id
    };

    setMessages([...messages, ...[messageToShow]]);

    attendantWebSocket.emit('delivery_message_to_client', messageToShow);

  }

  useEffect(() => {
    if(isOnline){
      attendantWebSocket.on('client_on_row', (params) => { //atualiza os clientes que estão na fila para todos os atendentes
        setNewClient(params)
      });

      attendantWebSocket.on('client_get_out', (params) => {
        console.log('Cliente se desconectou', params);
      })

    }
  }, [isOnline])

  useEffect(() => {
    attendantWebSocket.on('recieve_message_of_client', (params)=>{
      setClientMessage(params);
    })
  }, []);

  useEffect(() => {
    setMessages([...messages, ...[clientMessage]]);
  }, [clientMessage])

  useEffect(() => {
    setRowOfAttendance([...rowOfAttendance, ...[newClient]]); //adciona novo cliente na fila de atendimento;
  }, [newClient])

  useEffect(() => {
    attendantWebSocket.on('clients_in_attendance', (params) => { //atualiza o estado da fila 
      const clients = rowOfAttendance.filter((item) => {
        return item.from === params.from;
      });
      const client = clients[0];
      if(client){
        setLastClientInAttendance(params);
        setClientsInAttendance([...clientsInAttendance, ...[client]]);
        attendantWebSocket.emit('refresh_list_of_attendance', (params)); //atualiza a lista de atendimento de todos os atendentes
      };
    });

  }, [rowOfAttendance]);

  useEffect(() => {
    attendantWebSocket.on('refresh_row_of_attendance', (params) => { //recarrega a lista de atendimento disponível dos atendentes
      const refreshRowOfAttendance = rowOfAttendance.filter((item) => {
        return item.from !== params.from;
      });
      setRowOfAttendance(refreshRowOfAttendance);
    })
  }, [lastClientInAttendance])

  return (
    <div>
      <h1>Chat atendente</h1>
      <button onClick={() => handleGetOnline()}>{`Ficar ${isOnline ? 'Offline' : 'Online'}`}</button>
      <button onClick={() => handleCloseSession()}>Encerrar atendimento</button>
      {/* <button onClick={() => handleGetOnline()}>Atualizar fila</button> */}
      <div style={{display: 'flex'}}>
        <div>
          <h1>Fila</h1>
          <ul>
            {rowOfAttendance?.map((item) => (
              <li key={item.from}>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <button onClick={() => handleGetClientToAttendance(item)}>Atender</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1>Em atendimento</h1>
          <ul>
            {clientsInAttendance?.map((item) => (
              <li key={item.from}>
                <p>{item.name}</p>
                <p>{item.email}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1>Meus atendimentos</h1>
          <ul>
            {myAttendances?.map((item) => (
              <li key={item.from}>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <button onClick={() => handleTalk(item)}>Conversar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div>
          <h3>Você está atendendo :</h3>
          <p>{currentClientInAttendance.name}</p>
          <p>{currentClientInAttendance.email}</p>
        </div>
        <div>
          <div style={{display: 'block', maxHeight: '600px', width: '400px', overflowX: 'hidden', overFlowY: 'auto', height:'400px', border: '1px solid #ddd'}}>
            {messages?.map((item) => (
              <div style={{background: item.isAttendant && '#fc3'}}>
                <p>{item.text}</p>
                <small>{item.hour}</small>
              </div>
            ))}
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <textarea rows="8" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Sua mensagem"></textarea>
            <button onClick={() => handleSubmitMessage(currentClientInAttendance)}>Enviar mensagem</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
