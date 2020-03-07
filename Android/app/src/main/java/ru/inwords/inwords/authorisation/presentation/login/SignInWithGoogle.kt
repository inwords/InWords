package ru.inwords.inwords.authorisation.presentation.login

import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.Status.RESULT_INTERNAL_ERROR
import com.google.android.gms.tasks.Task
import io.reactivex.Single
import ru.inwords.inwords.R
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SignInWithGoogle @Inject constructor(context: Context) {

    private val googleSignInClient: GoogleSignInClient = GoogleSignIn.getClient(context, getOptions(context))

    fun init1(context: Context) {

        val account = GoogleSignIn.getLastSignedInAccount(context)
    }

    fun getSignInIntent() = googleSignInClient.signInIntent

    fun silentSignIn(): Single<GoogleSignInAccount> {
        return Single.create { emitter ->
            googleSignInClient.silentSignIn()
                .addOnCompleteListener { task ->
                    handleSignInResult(
                        completedTask = task,
                        onSuccess = { emitter.onSuccess(it) },
                        onError = { emitter.onError(it) })
                }
        }
    }

    fun handleSignInResult(
        intent: Intent,
        onSuccess: (GoogleSignInAccount) -> Unit,
        onError: (ApiException) -> Unit
    ) {
        // The Task returned from this call is always completed, no need to attach a listener.
        val task = GoogleSignIn.getSignedInAccountFromIntent(intent)
        handleSignInResult(task, onSuccess, onError)
    }

    private fun handleSignInResult(
        completedTask: Task<GoogleSignInAccount>,
        onSuccess: (GoogleSignInAccount) -> Unit,
        onError: (ApiException) -> Unit
    ) {
        try {
            val account = completedTask.getResult(ApiException::class.java) ?: throw ApiException(RESULT_INTERNAL_ERROR)

            // Signed in successfully, show authenticated UI.
            Log.d(javaClass.simpleName, account.idToken.toString())
            onSuccess.invoke(account)
        } catch (e: ApiException) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            Log.w(javaClass.simpleName, "signInResult:failed code=" + e.statusCode)
            onError.invoke(e)
        }
    }

    private fun getOptions(context: Context): GoogleSignInOptions {
        return GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestIdToken(context.getString(R.string.default_web_client_id))
            .build()
    }
}