package com.seftedu
import android.content.ContentValues
import android.os.Build
import android.provider.MediaStore
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class DownloadModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DownloadModule"
    }

    @ReactMethod
    fun savePdfToDownloads(
        sourcePath: String,
        fileName: String,
        promise: Promise
    ) {
        try {

            val sourceFile = File(sourcePath)

            if (!sourceFile.exists()) {
                promise.reject(
                    "SOURCE_NOT_FOUND",
                    "PDF source file পাওয়া যায়নি।"
                )
                return
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {

                val resolver = reactContext.contentResolver

                val contentValues = ContentValues().apply {

                    put(
                        MediaStore.Downloads.DISPLAY_NAME,
                        fileName
                    )

                    put(
                        MediaStore.Downloads.MIME_TYPE,
                        "application/pdf"
                    )

                    put(
                        MediaStore.Downloads.RELATIVE_PATH,
                        "Download/SEF"
                    )

                    put(
                        MediaStore.Downloads.IS_PENDING,
                        1
                    )
                }

                val uri = resolver.insert(
                    MediaStore.Downloads.EXTERNAL_CONTENT_URI,
                    contentValues
                )

                if (uri == null) {
                    promise.reject(
                        "MEDIASTORE_ERROR",
                        "Downloads folder-এ PDF তৈরি করা যায়নি।"
                    )
                    return
                }

                try {

                    resolver.openOutputStream(uri)?.use { output ->

                        sourceFile.inputStream().use { input ->

                            input.copyTo(output)
                        }
                    }

                    val completedValues = ContentValues().apply {
                        put(
                            MediaStore.Downloads.IS_PENDING,
                            0
                        )
                    }

                    resolver.update(
                        uri,
                        completedValues,
                        null,
                        null
                    )

                    promise.resolve(uri.toString())

                } catch (e: Exception) {

                    resolver.delete(uri, null, null)

                    throw e
                }

            } else {

                /*
                 * Android 9 and below.
                 */
                val downloadsDir =
                    android.os.Environment.getExternalStoragePublicDirectory(
                        android.os.Environment.DIRECTORY_DOWNLOADS
                    )

                val sefDir = File(
                    downloadsDir,
                    "SEF"
                )

                if (!sefDir.exists()) {
                    sefDir.mkdirs()
                }

                val destination =
                    File(sefDir, fileName)

                sourceFile.copyTo(
                    destination,
                    overwrite = true
                )

                promise.resolve(
                    destination.absolutePath
                )
            }

        } catch (e: Exception) {

            promise.reject(
                "DOWNLOAD_ERROR",
                e.message,
                e
            )
        }
    }
}