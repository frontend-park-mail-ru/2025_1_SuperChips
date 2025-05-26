import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import type { ICommentData } from '../model/types';
import { commentLikeHandler } from '../handlers/commentLikeHandler';
import template from './Comment.hbs';
import './Comment.scss';

export class Comment {
    private element: HTMLElement;
    private data: ICommentData;
    private pinID: string;
    private isLiking: boolean = false;

    constructor(data: ICommentData, pinID: string) {
        this.data = data;
        this.pinID = pinID;
        this.element = this.createElement();
        this.addEventListeners();
    }

    private createElement(): HTMLElement {
        const container = document.createElement('div');
        container.innerHTML = template({
            ...this.data,
            shortUsername: this.data.author_username[0].toUpperCase(),
            showActions: this.data.author_username === Auth.userData?.username
        });
        return container.firstElementChild as HTMLElement;
    }

    private addEventListeners(): void {
        const likeButton = this.element.querySelector('.comment__like-button');
        const deleteButton = this.element.querySelector('.comment__action-delete');
        const actionsMenu = this.element.querySelector('.comment__actions-menu');
        const actionsIcon = this.element.querySelector('.comment__actions-icon');
        const avatar = this.element.querySelector('.comment__avatar');

        likeButton?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!this.isLiking) {
                this.isLiking = true;
                commentLikeHandler(this.pinID, this.data.id)
                    .finally(() => {
                        this.isLiking = false;
                    });
            }
        });

        // Add click event to avatar for profile navigation
        avatar?.addEventListener('click', () => {
            window.location.href = `/${this.data.author_username}`;
        });

        if (this.data.author_username === Auth.userData?.username) {
            deleteButton?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleDelete();
            });

            actionsIcon?.addEventListener('click', (e) => {
                e.stopPropagation();
                actionsMenu?.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.element.contains(e.target as Node)) {
                    actionsMenu?.classList.remove('active');
                }
            });

            // Close menu when scrolling
            document.addEventListener('scroll', () => {
                actionsMenu?.classList.remove('active');
            });

            // Close menu when pressing ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    actionsMenu?.classList.remove('active');
                }
            });
        }
    }

    private async handleDelete(): Promise<void> {
        const response = await API.delete(`/flows/${this.pinID}/comments/${this.data.id}`);
        if (response instanceof Error || !response.ok) return;

        this.element.remove();

        const commentsList = document.querySelector('.comments-list');
        if (commentsList && commentsList.children.length === 0) {
            commentsList.innerHTML = '<div class="comments-empty">Нет комментариев</div>';
        }
    }

    public getElement(): HTMLElement {
        return this.element;
    }
}
