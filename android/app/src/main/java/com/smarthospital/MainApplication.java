package com.smarthospital;

import android.app.Application;

import com.facebook.react.ReactApplication;
import im.shimo.react.cookie.CookieManagerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.ekreutz.barcodescanner.BarcodeScannerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.horcrux.svg.SvgPackage;
import community.revteltech.nfc.NfcManagerPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import java.util.Arrays;
import java.util.List;
import io.realm.react.RealmReactPackage; // add this import
import com.zaguini.rnjwt.RNJwtPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new CookieManagerPackage(),
          new ReactNativePushNotificationPackage(),
          new LinearGradientPackage(),
          new SvgPackage(),
          new NfcManagerPackage(),
          new ReactNativeFingerprintScannerPackage(),
          new RNCameraPackage(),
          new BarcodeScannerPackage(),
          new VectorIconsPackage(),
          new RealmReactPackage(), // add this line
          new RNJwtPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
