import React, { createContext, useState } from "react";

interface MessageUser {
  UserID: string;
  Username: string;
  ProfilePicture: string | null;
  Biography: string | null;
}

interface MessageClickedContextValue {
  messageUser: MessageUser | null;
  setMessageUser: React.Dispatch<React.SetStateAction<MessageUser | null>>;
}

export const MessageUserContext = createContext<MessageClickedContextValue>({
  messageUser: null,
  setMessageUser: () => {},
});

interface UserClickedProviderProps {
  children: React.ReactNode;
}

export default function SearchMessageUser({
  children,
}: UserClickedProviderProps) {
  const [messageUser, setMessageUser] = useState<MessageUser | null>(null);

  return (
    <MessageUserContext.Provider value={{ messageUser, setMessageUser }}>
      {children}
    </MessageUserContext.Provider>
  );
}
