use anyhow::Result;
use dotenv::from_path;
use qiniu_sdk::upload::{
    apis::{credential::Credential, upload_token::ObjectUploadTokenProvider},
    AutoUploader, AutoUploaderObjectParams, UploadManager,
};
use std::{env, path::Path, time::Duration};
use walkdir::WalkDir;

#[tokio::main]
async fn main() -> Result<()> {
    // 运行命令
    // APP_NAME=$APP_NAME BUILD_ENV=$BUILD_ENV QINIU_AK=$QINIU_AK QINIU_SK=$QINIU_SK QINIU_BUCKET=$QINIU_BUCKET cargo run -p ci
    let current_path = env::current_dir()?;
    // from_path(Path::new("packages/ci/.env")).ok();

    let app_name = env::var("APP_NAME").expect("APP_NAME is not set");
    let build_env = env::var("BUILD_ENV").unwrap_or_else(|_| String::from("test"));
    let app_env = format!(
        "{}/apps/{}/.env.{}",
        current_path.display(),
        app_name,
        build_env
    );
    from_path(Path::new(&app_env)).ok();

    let ak = env::var("QINIU_AK").expect("QINIU_AK is not set");
    let sk = env::var("QINIU_SK").expect("QINIU_SK is not set");
    let bucket = env::var("QINIU_BUCKET").expect("QINIU_BUCKET is not set");

    let project_prefix = env::var("VITE_PROJECT_PREFIX").unwrap_or_default();
    let dist_path = env::var("VITE_DIST_PATH").unwrap_or_default();
    let cdn_path = env::var("VITE_CDN_NAME").unwrap_or_default();

    println!("ak {}", &ak);
    println!("cdn_path {}", &cdn_path);
    let credential = Credential::new(ak.clone(), sk);

    let dir_path = format!(
        "{}/{}/{}",
        current_path.display(),
        project_prefix,
        dist_path
    );

    for entry in WalkDir::new(dir_path.clone()) {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            let relative_path = path.strip_prefix(&dir_path).unwrap();
            let object_name = format!("{}/{}", &cdn_path, relative_path.display());

            let upload_manager = UploadManager::new(ObjectUploadTokenProvider::new(
                &bucket,
                &object_name,
                Duration::from_secs(3600),
                credential.clone(),
            ));

            println!("file_name: {}", &object_name);
            let uploader: AutoUploader = upload_manager.auto_uploader();
            println!("Uploading {} to {}", path.display(), &object_name);

            let params = AutoUploaderObjectParams::builder()
                .object_name(&object_name)
                .file_name(&object_name)
                .build();

            let mut retry_count = 0;
            loop {
                match uploader.upload_path(&path, params.clone()) {
                    Ok(_) => break,
                    Err(e) => {
                        println!("Upload failed due to {:?}", e);
                        retry_count += 1;
                        if retry_count >= 3 {
                            println!("Failed to upload after 3 attempts");
                            return Err(anyhow::anyhow!("Failed to upload after 3 attempts"));
                        }
                    }
                }
            }
        }
    }
    Ok(())
}
