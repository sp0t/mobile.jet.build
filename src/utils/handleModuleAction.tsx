import { apiService } from '../services/api.service';
import { clearUser, updateDrawings, updateFiles, updateReports } from '../store/slices/userSlice';
import Routes from '../routes/routesNames';
import ToastService from '../services/toast.service';

const handleModuleAction = async (key: string, project: any, dispatch: any, navigate: any, showProgress: any, hideProgress: any) => {
    showProgress('Loading...');
  
    try {
      if (key == 'Home') {
        navigate(Routes.Home);
      } else if (key === 'Files') {
        const files = await apiService.getFiles(0, project?.project_data!);
        dispatch(updateFiles(files));
        navigate(Routes.Files, { files });
      } else if (key === 'Daily Reports') {
        const reports = await apiService.getReports(project?.project_data!);
        dispatch(updateReports(reports));
        navigate(Routes.Reports);
      } else if (key === 'Drawings') {
        const drawings = await apiService.getDrawings(project?.project_data!);
        dispatch(updateDrawings(drawings));
        navigate(Routes.Drawings);
      } else if (key === 'Punch Lists') {
        // Assuming similar logic for 'Punch Lists'
        // const punchLists = await apiService.getPunchLists(project?.project_data!);
        // dispatch(updatePunchLists(punchLists));
        // navigate(Routes.PunchLists);
      }
    } catch (error: any) {
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    } finally {
      hideProgress();
    }
  };

  export default handleModuleAction;
  