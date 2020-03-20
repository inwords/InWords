package ru.inwords.inwords.authorisation.presentation.login

import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.R
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SignInWithGoogle @Inject constructor(context: Context) {

    private val googleSignInClient: GoogleSignInClient = GoogleSignIn.getClient(context, getOptions(context))

    fun getSignInIntent() = googleSignInClient.signInIntent

    fun silentSignIn(): Single<GoogleSignedInData> {
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

    fun signOut(): Completable {
        return Completable.create { emitter ->
            googleSignInClient.signOut()
                .addOnCompleteListener { task ->
                    try {
                        task.getResult(ApiException::class.java)
                        emitter.onComplete()
                    } catch (e: ApiException) {
                        Log.w(javaClass.simpleName, "signInResult:failed code=" + e.statusCode)
                        emitter.onError(e)
                    }
                }
        }
    }

    fun revokeAccess(): Completable {
        return Completable.create { emitter ->
            googleSignInClient.revokeAccess()
                .addOnCompleteListener { task ->
                    try {
                        task.getResult(ApiException::class.java)
                        emitter.onComplete()
                    } catch (e: ApiException) {
                        Log.w(javaClass.simpleName, "signInResult:failed code=" + e.statusCode)
                        emitter.onError(e)
                    }
                }
        }
    }

    fun handleSignInResult(
        intent: Intent,
        onSuccess: (GoogleSignedInData) -> Unit,
        onError: (ApiException) -> Unit
    ) {
        // The Task returned from this call is always completed, no need to attach a listener.
        val task = GoogleSignIn.getSignedInAccountFromIntent(intent)
        handleSignInResult(task, onSuccess, onError)
    }

    private fun handleSignInResult(
        completedTask: Task<GoogleSignInAccount>,
        onSuccess: (GoogleSignedInData) -> Unit,
        onError: (ApiException) -> Unit
    ) {
        try {
            val account = requireNotNull(completedTask.getResult(ApiException::class.java)) { "account is null" }

            val googleSignedInData = GoogleSignedInData(
                userId = requireNotNull(account.id) { "userId is null" },
                idToken = requireNotNull(account.idToken) { "idToken is null" },
                email = requireNotNull(account.email) { "email is null" }
            )

            // Signed in successfully, show authenticated UI.
            Log.d(javaClass.simpleName, account.idToken.toString())
            onSuccess.invoke(googleSignedInData)
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

    data class GoogleSignedInData(val userId: String, val idToken: String, val email: String)
}