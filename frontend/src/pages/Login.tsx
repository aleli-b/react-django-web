import "../styles/Form.css"
import Form from "../components/Form"

export const Login = () => {
  return (
    <div>
      <Form route="/api/token/" method="login" />
    </div>
  )
}
