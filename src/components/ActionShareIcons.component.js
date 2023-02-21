import Image from 'next/image';
import { db } from 'utils/Firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import styles from 'styles/Home.module.css';
import { useMutation } from 'react-query';
import { generateSuperResolution } from 'queryhook/generate';
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export default function ActionShareIcons({ imageUrlForShare }) {
	const convertImageToSuperResMutation = useMutation((imageUrlForShare) =>
		generateSuperResolution(imageUrlForShare), {
		onSuccess(data) {
				console.log(data);
			saveAs(data.data.image_url)
			toast.info('Image downloading...')
		}, onError() {
				toast.error('Failed to load image')
		}}
	);

	const likeDislikeCollection = collection(db, 'likeDislike');
	const likeDislike = async (flag) => {
		// get the current timestamp
		const timestamp = Date.now().toString();
		// create a pointer to our Document
		const _data = doc(db, `likeDislike/${timestamp}`);
		// structure the todo data
		const likeDislikeData = {
			image: imageUrlForShare,
			like: flag,
		};
		try {
			//add the Document
			await setDoc(_data, likeDislikeData);
			if (flag) {
				alert('thanks for like');
			} else {
				alert('your information saved, will improve');
			}
		} catch (error) {
			console.log('An error occurred', error);
		}
	};
	return (
		<div
			className={`${styles.shareIconsWrap} col-12 mt-2 d-flex justify-content-around align-items-center`}
		>
			<div className="flex-row d-flex">
				<div className={`${styles.shareIconsText} d-flex flex-column`}>
					<Image
						className="cursor-pointer hoverEffect me-4"
						src={'/icons/like.png'}
						alt="like"
						width={30}
						height={25}
						onClick={() => likeDislike(true)}
					></Image>
				</div>
				<div className={`${styles.shareIconsText} d-flex flex-column`}>
					<Image
						className="cursor-pointer hoverEffect"
						src={'/icons/dislike.png'}
						alt="dislike"
						width={30}
						height={25}
						onClick={() => likeDislike(false)}
					></Image>
				</div>
			</div>
			<div>
				<b>Share on:</b>
			</div>
			<div className={`${styles.shareIconsText} d-flex flex-column`}>
				<button
					// download={imageUrlForShare}
					onClick={() =>
						convertImageToSuperResMutation.mutate(imageUrlForShare)
					}
					// href={imageUrlForShare}
					title="ImageName"
				>
					<Image
						className="cursor-pointer hoverEffect"
						src={'/icons/download.png'}
						alt="download"
						width={30}
						height={25}
					></Image>
				</button>
			</div>
			<div className={`${styles.shareIconsText} d-flex flex-column`}>
				<a
					href={`https://www.facebook.com/sharer/sharer.php?u=${imageUrlForShare}&t=TITLE`}
					onClick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
					target="_blank"
					title="Share on Facebook"
					rel="noopener noreferrer"
				>
					<Image
						className="cursor-pointer hoverEffect"
						src={'/icons/fb.png'}
						alt="fb"
						width={25}
						height={25}
					></Image>
				</a>
			</div>
			<div className={`${styles.shareIconsText} d-flex flex-column`}>
				<a
					href={`https://twitter.com/share?url=${imageUrlForShare}&via=TWITTER_HANDLE&text=TEXT`}
					onClick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
					target="_blank"
					title="Share on Twitter"
					rel="noopener noreferrer"
				>
					<Image
						className="cursor-pointer hoverEffect"
						src={'/icons/twitter.png'}
						alt="twitter"
						width={25}
						height={25}
					></Image>
				</a>
			</div>
			<div className={`${styles.shareIconsText} d-flex flex-column`}>
				<Image
					className="cursor-pointer hoverEffect"
					src={'/icons/insta.png'}
					alt="insta"
					width={25}
					height={25}
				></Image>
			</div>
			<div className={`${styles.shareIconsText} d-flex flex-column `}>
				<a
					href={`http://pinterest.com/pin/create/button/?url=${imageUrlForShare}&media=${imageUrlForShare}&description=description`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						className="cursor-pointer hoverEffect"
						src={'/icons/pintrest.png'}
						alt="pintrest"
						width={25}
						height={25}
					></Image>
				</a>
			</div>
		</div>
	);
}
