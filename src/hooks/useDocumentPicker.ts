import { useEffect, useState } from 'react';
import DocumentPicker, { DirectoryPickerResponse, DocumentPickerResponse, isInProgress, types } from 'react-native-document-picker';

export default function useDocumentPicker() {
  const [documents, setDocuments] = useState<Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null>(null);

  const handleDocumentsError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered');
    } else {
      throw err;
    }
  };

  const docSinglePicker = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setDocuments(pickerResult);
    } catch (e) {
      handleDocumentsError(e);
    }
  };

  return { documents, docSinglePicker };
}
