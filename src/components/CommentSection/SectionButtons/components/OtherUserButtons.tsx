import { SectionButtonsStyle } from '../../../../styled-components/SectionButtonsStyles';
import { controlType } from '../../../../types/type';
import { Reply } from '../../../icons';

interface otherUserButtonsProps {
  isComment: boolean;
  controlDispatch: Function;
}
export const OtherUserButtons: React.FC<otherUserButtonsProps> = ({
  isComment,
  controlDispatch,
}) => {
  return (
    <SectionButtonsStyle className="reply">
      <div className="btn btn-reply">
        <Reply />
        <button
          onClick={() => {
            if (isComment)
              controlDispatch({ type: controlType.OPEN_FORM_ADD_REPLY });
          }}
        >
          Reply
        </button>
      </div>
    </SectionButtonsStyle>
  );
};
