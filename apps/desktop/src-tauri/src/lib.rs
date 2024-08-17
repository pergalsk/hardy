use tauri::{AppHandle, Manager, WebviewWindow};

// Create the command:
// This command must be async so that it doesn't run on the main thread.
// https://v2.tauri.app/learn/splashscreen/
// https://tauri.app/v1/guides/features/splashscreen/
// #[tauri::command]
// async fn show_main_window(app: AppHandle, window: WebviewWindow) {
//   // Show main window
//   let main_window = app.get_webview_window("main").unwrap();
//   main_window.show().unwrap();
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    // .invoke_handler(tauri::generate_handler![show_main_window])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
