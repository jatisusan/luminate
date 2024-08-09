import { Alert } from "react-bootstrap"



const Message = ({variant, children}) => {
  return (
      <Alert className="mt-4">
          {children}
   </Alert>
  )
}

export default Message