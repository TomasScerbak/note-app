import classes from "./DesktopLeftPanel.module.css";

import Logo from "../components/UI/Logo";
import Button from "../components/UI/Button";
import TagList from "../pages/TagList";
import Separator from "../components/UI/Separator";
import { getBtnImages } from "../utils/desktopButtonsUtils";
import { useTheme } from "../contexts/themeContext";

const DesktopLeftPanel = ({ handleActiveBtn, deskBtnData }) => {
  const { theme } = useTheme();

  return (
    <>
      <section className={classes.top__left}>
        <Logo />
      </section>
      <section className={classes.left__sidebar}>
        {deskBtnData.map((btn) => {
          const { img } = getBtnImages(btn, theme);
          return (
            <Button
              key={btn.id}
              active={btn.active}
              src={img}
              secondarySrc={btn.img2}
              type={btn.type}
              hasImage={true}
              size={btn.size}
              variant={btn.variant}
              title={btn.title}
              btnImageClass="image-left"
              btnSecondaryImageClass="image-right"
              onClick={() => handleActiveBtn(btn.id)}
            />
          );
        })}
        <Separator />
        <TagList isDesktop={true} />
      </section>
    </>
  );
};

export default DesktopLeftPanel;
