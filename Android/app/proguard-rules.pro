# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Gson uses generic type information stored in a class file when working with fields. Proguard
# removes such information by default, so configure it to keep all of it.
-keepattributes Signature

# For using GSON @Expose annotation
-keepattributes *Annotation*

# Gson specific classes
-dontwarn sun.misc.**
#-keep class com.google.gson.stream.** { *; }

# Application classes that will be serialized/deserialized over Gson
-keep class ru.inwords.inwords.**.bean.** { <fields>; }
-keep class ru.inwords.inwords.**.model.** { <fields>; }
-keepclassmembers class * extends com.google.protobuf.GeneratedMessageLite { *; }
-keepclassmembers class org.chromium.net.impl.** { *; }

-keep class androidx.navigation.fragment.NavHostFragment

# Remove logs
-assumenosideeffects class android.util.Log {
    public static *** v(...);
    public static *** d(...);
    public static *** i(...);
    public static *** w(...);
    public static *** e(...);
}

# Prevent proguard from stripping interface information from TypeAdapterFactory,
# JsonSerializer, JsonDeserializer instances (so they can be used in @JsonAdapter)
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# Prevent R8 from leaving Data object members always null
-keepclassmembers,allowobfuscation class * {
  @com.google.gson.annotations.SerializedName <fields>;
}

# Fresco
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
  @com.facebook.common.internal.DoNotStrip *;
}

-keep @com.facebook.soloader.DoNotOptimize class *
-keepclassmembers class * {
  @com.facebook.soloader.DoNotOptimize *;
}

-keep public class com.facebook.imageutils.** {
   public *;
}

-dontwarn com.google.common.**
# Ignores: can't find referenced class javax.lang.model.element.Modifier
-dontwarn com.google.errorprone.annotations.**
-dontwarn javax.naming.**
-dontwarn okio.**