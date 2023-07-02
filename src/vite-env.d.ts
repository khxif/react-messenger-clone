/// <reference types="vite/client" />

 type Message = {
    [field: string]: any;
} | null []

type Msg = {
    id: Key | null | undefined;
    email: string | null | undefined;
    image: string | undefined;
    userName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
     createdAt: string | number | Date 
    }