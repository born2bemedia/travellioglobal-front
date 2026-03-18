'use client';

import { useFormsPopupStore } from '@/features/forms/model/store';

import { RequestPopup } from '../RequestPopup/RequestPopup';

export function FormsPopupRenderer() {
  const popupType = useFormsPopupStore((state) => state.popupType);
  const requestName = useFormsPopupStore((state) => state.requestName);
  const closePopup = () => {
    useFormsPopupStore.setState({ popupType: null, requestName: '' });
    //router.push('/');
  };

  return (
    <>
      {popupType === 'request' && requestName && (
        <RequestPopup service={requestName} isOpen onClose={closePopup} onReturnHome={closePopup} />
      )}
    </>
  );
}
