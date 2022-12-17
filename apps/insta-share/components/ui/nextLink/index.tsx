import Link from "next/link";
import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  href: string
} 

const NextLink:React.FC<IProps> = ({children, href}) => {
  return (
    <Link href={href} style={{textDecoration: 'none'}}>
      {children}
    </Link>
  )
}

export default NextLink;