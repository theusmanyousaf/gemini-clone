import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    const animatePara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        }, 50*index)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        const res = await runChat(prompt);
        let resArray = res.split("**")
        let newRes;
        for (let i = 0; i < resArray.length; i++) {
            if(i === 0 || i % 2 !== 1){
                newRes += resArray[i];
            } else {
                newRes += "<strong>" + resArray[i] + "</strong>";
            }
        }
        let result = newRes.split("*").join("<br/>")
        
        let newResponseArray = result.split(" ");
        newResponseArray.map(( word, index ) => {
            animatePara(index, word+" ");
        })
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
};

export default ContextProvider;