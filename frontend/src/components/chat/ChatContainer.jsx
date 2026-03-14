import Message from "./Message";
import WelcomeScreen from "../layout/WelcomeScreen";

export default function ChatContainer({ messages, onTopicSelect}) {

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="w-full px-6 py-5">
                {(messages.length >= 10) ? messages.map((msg,i) => <Message key={i} msg={msg}/> )
                : <WelcomeScreen onSelect={onTopicSelect}/>}
            </div>
        </div>
    );
}