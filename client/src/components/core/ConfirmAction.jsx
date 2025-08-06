import React from 'react';
import { Button } from '../../components/ui';

export const ConfirmAction = ({
  isOpen = true,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  handleCancel,
  handleConfirm,
  surveyData,
  action = 'delete',
}) => {
  const finalOnCancel = onCancel || handleCancel;
  const finalOnConfirm = onConfirm || handleConfirm;

  const actionConfigs = {
    delete: {
      title: 'Delete Survey?',
      message: surveyData?.title
        ? `Are you sure you want to delete "${surveyData.title}"? This action cannot be undone.`
        : 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      confirmVariant: 'danger',
    },
    cancel: {
      title: 'Discard Changes?',
      message:
        'Are you sure you want to discard your changes? Any unsaved data will be lost.',
      confirmText: 'Discard',
      confirmVariant: 'danger',
    },
    archive: {
      title: 'Archive Item?',
      message: surveyData?.title
        ? `Are you sure you want to archive "${surveyData.title}"?`
        : 'Are you sure you want to archive this item?',
      confirmText: 'Archive',
      confirmVariant: 'warning',
    },
  };

  const config = actionConfigs[action] || actionConfigs.delete;
  const finalTitle = title || config.title;
  const finalMessage = message || config.message;
  const finalConfirmText =
    confirmText !== 'Confirm' ? confirmText : config.confirmText;
  const finalConfirmVariant =
    confirmVariant !== 'danger' ? confirmVariant : config.confirmVariant;

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">{finalTitle}</h3>
        <p className="text-sm text-gray-600 mb-5">{finalMessage}</p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={finalOnCancel}>
            {cancelText}
          </Button>
          <Button variant={finalConfirmVariant} onClick={finalOnConfirm}>
            {finalConfirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
