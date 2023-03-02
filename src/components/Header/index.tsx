import Link from "next/link";
import {HeaderContainer} from "./styles";
import Logo from "../../assets/logo.svg";
import Image from "next/image";
import { Cart } from "../Cart";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={Logo} alt="igShop" width={120} height={110} />
      </Link>
      <Cart/>
    </HeaderContainer>
  );
}
