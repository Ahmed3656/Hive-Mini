import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalFooter,
  Input,
  Select,
  useToastHelpers,
} from '../../components/ui';
import { useGlobalLoading } from '../../components/shared';
import { ConfirmAction } from './ConfirmAction';
import {
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  LANGUAGE_OPTIONS,
} from '../../constants';

const CURRENT_USER = {
  id: 1,
  name: 'Basem Shawaly',
};

// API service function
const createSurvey = async (surveyData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/API/Survey/Add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(surveyData),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.Error) {
    throw new Error(result.Error.Message || 'Failed to create survey');
  }

  return result;
};

export const CreateSurveyModal = ({ isOpen, onClose, onSurveyCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'Draft',
    createdBy: CURRENT_USER.id,
    modifiedAt: new Date(),
    modifiedBy: CURRENT_USER.id,
    type: '',
    language: 'English',
    responses: 0,
  });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { success, danger } = useToastHelpers();
  const { startLoading, stopLoading } = useGlobalLoading();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        status: 'Draft',
        createdBy: CURRENT_USER.id,
        modifiedAt: new Date(),
        modifiedBy: CURRENT_USER.id,
        type: '',
        language: 'English',
        responses: 0,
      });
    }
  }, [isOpen, setFormData]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      modifiedAt: new Date(),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.language) {
      newErrors.language = 'Language is required';
    }

    return Object.keys(newErrors).length === 0;
  };

  const transformDataForAPI = (data) => {
    return {
      Title: data.title,
      Status: data.status,
      CreatedBy: data.createdBy,
      ModifiedAt: data.modifiedAt.toISOString(),
      ModifiedBy: data.modifiedBy,
      Type: data.type,
      Language: data.language,
      Responses: data.responses,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      danger('Validation Error', 'Please fill in all required fields');
      return;
    }

    startLoading('Creating survey', '', {
      type: 'gradient',
    });

    try {
      const apiData = transformDataForAPI(formData);
      const response = await createSurvey(apiData);

      success(
        'Survey Created!',
        `"${formData.title}" has been created successfully`
      );

      onSurveyCreated?.(response.Result || formData);
      onClose();
    } catch (error) {
      console.error('Error creating survey:', error);
      danger(
        'Error',
        error.message || 'Failed to create survey. Please try again.'
      );
    } finally {
      stopLoading();
    }
  };

  const handleCancel = () => {
    if (formData.title.trim() || formData.type) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Create New Survey"
      size="lg"
      closeOnOverlayClick={false}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Survey Title */}
        <div>
          <Input
            label="Survey Title *"
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Enter survey title"
          />
        </div>

        {/* Status and Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Status *"
            options={STATUS_OPTIONS}
            value={formData.status}
            onChange={(value) => updateField('status', value)}
          />

          <Select
            label="Survey Type *"
            options={TYPE_OPTIONS}
            value={formData.type}
            onChange={(value) => updateField('type', value)}
            placeholder="Select survey type"
          />
        </div>

        {/* Language */}
        <div>
          <Select
            label="Language *"
            options={LANGUAGE_OPTIONS}
            value={formData.language}
            onChange={(value) => updateField('language', value)}
          />
        </div>

        {/* Read-only fields for information */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h4 className="text-sm font-medium text-gray-700">
            Survey Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="created-by"
              >
                Created By
              </label>
              <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-600">
                {CURRENT_USER.name} (ID: {formData.createdBy})
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="modified-by"
              >
                Modified By
              </label>
              <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-600">
                {CURRENT_USER.name} (ID: {formData.modifiedBy})
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="modified-at"
              >
                Modified At
              </label>
              <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-600">
                {formData.modifiedAt.toLocaleString()}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="responses"
              >
                Initial Responses
              </label>
              <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-600">
                {formData.responses}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <ModalFooter className="flex justify-end space-x-3 -mx-6 -mb-4">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" className="min-w-[120px]">
            Create Survey
          </Button>
        </ModalFooter>
      </form>
      {showCancelConfirm && (
        <ConfirmAction
          action="cancel"
          onCancel={() => setShowCancelConfirm(false)}
          onConfirm={() => {
            setShowCancelConfirm(false);
            onClose();
          }}
        />
      )}
    </Modal>
  );
};
