const Ticket = ({ ticket }) => {
  return (
    <div className="ticket-container">
      <p id="id">
        <span className="icon">&#128272;</span> {ticket.id}
      </p>
      <p id="title">
        <span className="icon">&#128196;</span> {ticket.title}
      </p>
      <p id="tag">
        <span className="icon">&#128278;</span> {ticket.tag.join(", ")}
      </p>
    </div>
  );
};

export default Ticket;
