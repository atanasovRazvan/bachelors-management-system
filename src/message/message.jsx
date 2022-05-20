import './message.scss';

const Message = ({ message, variant }) => (
    <div className={`message message-${variant}`}>
        {message}
    </div>
)

export default Message;
