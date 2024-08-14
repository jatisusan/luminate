import { Helmet } from "react-helmet-async";

const Meta = ({title="Welcome to Luminate" , description="Luminate Blog Platform"}) => {
  return (
      <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
      </Helmet>
  )
}

export default Meta