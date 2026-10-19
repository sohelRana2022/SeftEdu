import {NativeModules, Platform} from 'react-native';

interface DownloadModuleType {
  savePdfToDownloads(sourcePath: string, fileName: string): Promise<string>;
}

const {DownloadModule} = NativeModules as {
  DownloadModule: DownloadModuleType;
};

export const savePdfToDownloads = async (
  sourcePath: string,
  fileName: string,
): Promise<string> => {
  if (Platform.OS !== 'android') {
    throw new Error('এই Download implementation শুধু Android-এর জন্য।');
  }

  if (!DownloadModule) {
    throw new Error('DownloadModule পাওয়া যায়নি। Android app rebuild করুন।');
  }

  return DownloadModule.savePdfToDownloads(sourcePath, fileName);
};
