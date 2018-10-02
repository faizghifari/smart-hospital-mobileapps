### Smart Medical Management Asset
## Installation
# Reference and dependencies
For full reference about dependencies and installation please open
https://facebook.github.io/react-native/docs/getting-started
In section **Building Projects with Native Code**
Don't forget to choose the Development OS and Target OS you need
Just follow everything and stop before **Creating a new application**

# Preparing Device
Keep opening the reference URL
Follow the **Preparing the Android device** section for Android and choose whether you want to use Emulator or Physical Device and **Running on a device** for iOS if you want to use Physical Device
Tips :
* Use the physical device since it was lighter, and we also want to use a lot of device sensor
* Download and install the Android Debug Bridge (ADB) manually if you want to use android physical device (try running `adb` in CLI to check the installation, make sure it's worked, check the environment path if it's not worked)

# Running Installation
1. After following the reference you should have the react-native-cli, node, and NPM in your CMD/Terminal (if not please consider to check the environment variable (usually you can add the System Path with YOUR_NODE_INSTALLATION_PATH\\nodejs\\))
1. Open your CMD/Terminal in the direction of the project folder
1. Run `npm install` on the CMD/Terminal, this step is to install the dependencies needed
1. Open the package.json and search every dependencies in google to find the manual package installation (some of it have, and some not)
  1. Example : Search for "react-native-cookie" in Google
  1. you should find the github/npm project, open it
  1. (**Do both for Android and iOS if you developing for 2 OS at the same time, or you can choose to do the Android/iOS section only if you not do for both OS**) There should be some notes about manual installation (**Warning: Read everything carefully first before do the step, it should help you a lot in the installation progress**)
1. Read the Preparing Device section
1. After do all the manual package installation, test run `react-native run-android` to build for android and `react-native run-ios` to build for iOS

## Dev Build
1. Plug USB to the device and try running `adb devices` and make sure there is some unique code with status "device"
1. Run `react-native run-android` to build for android and `react-native run-ios` to build for iOS
1. You can do wireless (Plug-off the USB) update after the Node Server is up
  1. Make sure your device connect to the same connection with the server (PC/Laptop)
  1. Just shake your phone
  1. Open "Dev Settings"
  1. Open "Debug server host & port for device"
  1. Insert the server IP with port 8081 (example : 10.151.252.145:8081)

## Deployment Build Android
For full reference for android please open
https://facebook.github.io/react-native/docs/signed-apk-android

## Deployment Build iOS


To be able to run the iOS app with all running dependencies, you need to have Xcode in your Mac. If not, easily install it from the AppStore. 

Assuminng Xcode is installed, go to the project folder. Inside ‘ios’ folder, there will be a file named ‘SmartHospital.xcworkspace’. Open it with Xcode and follow these steps.

First, you need to get an Apple developer account 

1.	Visit developer.apple.com
2.	Click Member Center
3.	Sign in with your Apple ID 
(If you don’t have an Apple ID, you’ll need to create one first. Click Create Apple ID, and fill out the required information and click Continue. You’ll then need to sign in with the Apple ID that you just created, and go back to the Member Center.)
4.	Check box to accept the agreement and click the Submit button.

Second, signing in with Xcode

1.	On Xcode, click Xcode -> Preferences -> Accounts and click the `+` sign and choose Add Apple ID
2.	Login the Apple ID that you just created

Third, to run the code and the simulator, you need to choose one of the simulators or connect your iPhone to the Mac. After connected, then just click Run `>` on the left corner.


## Some Help
There is some file that can help you understand the code
1. cleaning.txt - list of file used and what is it used for
2. FileFlow.txt - to understand the file flow for the functionality
