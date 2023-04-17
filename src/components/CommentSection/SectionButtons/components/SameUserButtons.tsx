import { SectionButtonsStyle } from '../../../../styled-components/SectionButtonsStyles';
import { controlType } from '../../../../types/type';
import Delete from '../../../icons/Delete';
import Edit from '../../../icons/Edit';

interface sameUserButtonsProps {
  isComment: boolean;
  controlDispatch: Function;
  handleOpenModal: Function;
}
export const SameUserButtons: React.FC<sameUserButtonsProps> = ({
  isComment,
  controlDispatch,
  handleOpenModal,
}) => {
  return (
    <SectionButtonsStyle className="reply">
      <div role="button" className="btn btn-edit">
        <Edit />
        <span
          onClick={() => {
            if (isComment)
              controlDispatch({ type: controlType.OPEN_FORM_EDIT_COMMENT });
            else controlDispatch({ type: controlType.OPEN_FORM_EDIT_REPLY });
          }}
        >
          Edit
        </span>
      </div>
      <div
        role="button"
        className="btn btn-delete"
        data-testid="open-modal-delete-comment"
        onClick={() => handleOpenModal()}
      >
        <Delete />
        <span>Delete</span>
      </div>
    </SectionButtonsStyle>
  );
};
