import { colors } from "@/shared/styles/colors";
import SmallCapsText from "../SmallCapsText";

type ActionBarTitleProps = {
  title: string;
}

export default function ActionBarTitle({title}: ActionBarTitleProps)  {
  return (
    <SmallCapsText
      size={12}
      color={colors.pencil}
      style={{marginBottom: 4, }}
    >
      {title}
    </SmallCapsText>
  );
}